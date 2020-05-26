import Request from './Request';

class User extends Request {

  async listExams() {
    return this.axios.get(`${this.apiUrl}/exams`)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  }

}

export default User;
