import Request from './Request';
import { getStringFromDate } from '../utils/date';
import { getCookie } from '../utils/cookie';
import { parseToken } from '../utils/auth';
import { getAnchorFromCsv } from '../utils/csv';

class User extends Request {
  constructor() {
    super();
    this.baseUrl = `${this.apiUrl}/users`;
  }

  async listUsers(page, documentId, role) {
    let url = `${this.baseUrl}?page=${page}`;

    if (documentId) {
      url = `${url}&documentId=${documentId}`;
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

        const statusLabels = {
          'DONE': 'Hecho',
          'PENDING': 'Por realizar',
        };

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
        console.log(res.data, 'res.data');
        if (res.data) {
          const anchor = getAnchorFromCsv(res.data, res.headers['content-type'], 'usuarios_fallidos.csv');
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

  async downloadTests(id, testIds) {
    return this.axios.post(`${this.baseUrl}/${id}/tests/results/document`, { testIds })
      .then(({ data: { message } }) => message)
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
        return tests;
      })
      .catch((error) => {
        throw error;
      });
  }

  async assingTest(testName, templateId, userId) {
    return this.axios.post(
      `${this.baseUrl}/${userId}/tests/`,
      { tests: { testName, templateId } },
    )
      .then(({ data: { message } }) => message)
      .catch((error) => {
        throw error;
      });
  }

}

export default User;
