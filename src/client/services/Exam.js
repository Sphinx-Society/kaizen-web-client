import Request from './Request';

class Exam extends Request {

  async listExams() {
    return this.axios.get(`${this.apiUrl}/exams`)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  }

}

export default Exam;
