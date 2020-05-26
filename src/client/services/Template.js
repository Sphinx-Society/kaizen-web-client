import Request from './Request';

class Template extends Request {

  async listTemplates(page) {
    return this.axios.get(`${this.apiUrl}/templates?page=${page}`)
      .then(({ data: { message } }) => {
        return {
          ...message,
          totalTemplates: message.totalDocuments,
          templates: message.templates.map((template) => ({
            ...template,
            id: template._id,
            creationDate: template.insertedAt,
          })),
        };
      })
      .catch((error) => {
        throw error;
      });
  }

  async createTemplate(template) {
    const data = { ...template };

    data.fields = data.fields.map((field) => {
      const formattedField = { ...field };
      delete formattedField.id;
      return {
        ...formattedField,
        minLimit: Number(formattedField.minLimit),
        maxLimit: Number(formattedField.maxLimit),
        id: `${formattedField.name}-${formattedField.type}`,
      };
    });

    return this.axios.post(`${this.apiUrl}/templates`, data)
      .then(({ data: { message } }) => {
        return message;
      })
      .catch((error) => {
        throw error;
      });
  }

}

export default Template;
