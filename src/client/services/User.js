import Request from './Request';
import { getStringFromDate } from '../utils/date';
import { getCookie } from '../utils/cookie';
import { parseToken } from '../utils/auth';
import { getFileAnchor } from '../utils/fileManager';

class User extends Request {
  constructor() {
    super();
    this.baseUrl = `${this.apiUrl}/users`;
  }

  async listUsers(page, query, role) {
    let url = `${this.baseUrl}?page=${page}`;

    if (query) {
      url = `${url}&q=${query}`;
    }

    if (role) {
      url = `${url}&role=${role}`;
    }

    return this.axios.get(url)
      .then(({ data: { message } }) => {
        return {
          ...message,
          totalUsers: message.totalDocuments,
          users: message.users.map((user) => {
            return {
              ...user,
              id: user._id,
              creationDate: getStringFromDate(new Date(user.insertedAt)),
              updatedAt: getStringFromDate(new Date(user.updatedAt)),
              name: `${user.profile.firstName} ${user.profile.lastName}`,
              username: user.auth.username,
              country: user.profile.country,
              role: user.auth.role,
              document: user.profile.documentId,
            };
          }),
        };
      })
      .catch((error) => {
        throw error;
      });
  }

  async getUser(id) {
    return this.axios.get(`${this.baseUrl}/${id}`)
      .then(({ data: { message } }) => {
        const { tests, _id } = message;
        const { email, username, role } = message.auth;
        const {
          avatar,
          birthDate,
          country,
          documentId,
          firstName,
          gender,
          lastName,
          phoneNumber,
        } = message.profile;

        return {
          email,
          username,
          tests: tests ? tests.map((test) => ({
            ...test,
            id: test.testId,
            name: test.testName,
            status: test.status.toLowerCase(),
            statusLabel: statusLabels[test.status],
          })) : [],
          id: _id,
          avatar,
          birthDate,
          country,
          document: documentId,
          firstName,
          gender,
          lastName,
          phone: phoneNumber,
          name: `${firstName} ${lastName}`,
          role,
        };
      })
      .catch((error) => {
        throw error;
      });
  }

  async getProfile(id) {
    const role = getCookie('role');
    return this.axios.get(`${this.baseUrl}/${id}/profile`)
      .then(({ data: { message } }) => {
        return {
          ...message.profile,
          id: message._id,
          document: message.profile.documentId,
          phone: message.phoneNumber,
          name: `${message.firstName} ${message.lastName}`,
          role,
          tests: [],
        };
      })
      .catch((error) => {
        throw error;
      });
  }

  async updateProfile(data) {
    const userProfile = {
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        phoneNumber: data.phone,
        avatar: data.avatar,
        gender: data.gender,
        country: data.country,
        email: data.email,
      },
    };

    return this.axios.put(`${this.baseUrl}/${data.id}/profile`, userProfile);
  }

  async newUser(data) {
    const newUser = {
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        phoneNumber: data.phoneNumber,
        avatar: '',
        avatarMimeType: '',
        gender: data.gender,
        country: data.country,
        documentId: data.documentId,
      },
      auth: {
        email: data.email,
        role: data.role,
      },
    };

    return this.axios.post(`${this.baseUrl}`, newUser);
  }

  async createUsers(data) {
    return this.axios.post(`${this.baseUrl}/massive`, data)
      .then((res) => {
        if (res.data) {
          const anchor = getFileAnchor(res.data, res.headers['content-type'], 'usuarios_fallidos.csv');
          return anchor;
        }
        return null;
      });
  }

  async updateUser(data) {
    const updatedUser = {
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        phoneNumber: data.phoneNumber,
        avatar: '',
        gender: data.gender,
        country: data.country,
      },
      auth: {
        email: data.email,
      },
    };

    return this.axios.put(`${this.baseUrl}/${data.id}`, updatedUser);
  }

  async deleteUser(id) {
    return this.axios.delete(`${this.baseUrl}/${id}`);
  }

  async downloadTests(id, testsIds) {
    return this.axios.post(
      `${this.baseUrl}/${id}/tests/results/document`,
      { testsIds }, {
        responseType: 'blob',
      },
    )
      .then((res) => {
        const anchor = getFileAnchor(res.data, res.headers['content-type'], 'resultados.pdf');
        anchor.click();
        document.body.removeChild(anchor);
      })
      .catch((error) => {
        throw error;
      });
  }

  async login(data) {
    const self = this;
    const url = `${this.apiUrl}/users/login`;
    return this.axios.post(url, data)
      .then(({ data: { message: { jwt } } }) => {
        const { userId, role } = parseToken(jwt);
        document.cookie = `token=${jwt};max-age=${self.cookieAge};`;
        document.cookie = `uid=${userId};max-age=${self.cookieAge};`;
        document.cookie = `role=${role};max-age=${self.cookieAge};`;
      })
      .catch((error) => {
        throw error;
      });
  }

  async listTests(id) {
    const url = `${this.baseUrl}/${id}/tests?`;

    return this.axios.get(url)
      .then(({ data: { message: { tests } } }) => {

        const statusLabels = {
          'DONE': 'Hecho',
          'PENDING': 'Publicación pendiente',
        };

        return tests.map((test) => ({
          ...test,
          id: test.testId,
          name: test.testName,
          statusLabel: statusLabels[test.status],
          requestedAt: getStringFromDate(new Date(test.requestedAt)),
          doctorName: `${test.requestBy.firstName} ${test.requestBy.lastName}`,
        }));
      })
      .catch((error) => {
        throw error;
      });
  }

  async assignTest(testName, templateId, userId) {
    return this.axios.post(
      `${this.baseUrl}/${userId}/tests/`,
      { tests: { testName, templateId } },
    )
      .then(({ data: { message } }) => message)
      .catch((error) => {
        throw error;
      });
  }

  async getMedicalTest(patientUserId, testId) {
    return this.axios.get(
      `${this.baseUrl}/${patientUserId}/tests/${testId}`,
    )
      .then(({ data: { message } }) => {
        console.log(message);
        return message;
      })
      .catch((error) => {
        throw error;
      });
  }

  async submitTestResults(userId, testId, data) {
    const results = [];
    Object.keys(data).forEach((key) => {
      const meta = JSON.parse(key);
      const result = { value: data[key] };
      Object.keys(meta).forEach((metaKey) => {
        const metaData = meta[metaKey];
        if (metaData) {
          result[metaKey] = metaData;
        }
      });
      results.push(result);
    });

    return this.axios.put(`${this.baseUrl}/${userId}/tests/${testId}/results`, { results, status: 'PENDING' })
      .then(({ data: { message } }) => message)
      .catch((error) => {
        throw error;
      });
  }

  async deleteTestPending(testId, patientId) {
    return this.axios.delete(`${this.baseUrl}/${patientId}/tests/${testId}`)
      .then(({ data: { message } }) => message)
      .catch((error) => {
        throw error;
      });
  }

  async publishTest(userId, test) {
    return this.axios.put(
      `${this.baseUrl}/${userId}/tests/${test.id}/results`,
      {
        status: 'DONE',
        results: [...test.results],
      },
    )
      .then(({ data: { message } }) => message)
      .catch((error) => {
        throw error;
      });
  }

}

export default User;
