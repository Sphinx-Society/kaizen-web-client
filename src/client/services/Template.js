import Request from './Request';

class Template extends Request {

  async listTemplates() {
    return this.axios.get(`${this.apiUrl}/templates`)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  }

}

export default Template;
