import Request from './Request';
import { getStringFromDate } from '../utils/date';
import { getErrorType } from '../utils/error';

class Template extends Request {
  constructor(token) {
    super(token);
    this.baseUrl = `${this.apiUrl}/templates`;
  }

  async listTemplates(page, query) {
    let url = `${this.baseUrl}?page=${page}`;

    if (query) {
      url = `${url}&q=${query}`;
    }

    return this.axios.get(url)
      .then(({ data: { message } }) => {
        return {
          ...message,
          totalTemplates: message.totalDocuments,
          templates: message.templates.map((template) => ({
            ...template,
            id: template._id,
            creationDate: getStringFromDate(new Date(template.insertedAt)),
          })),
        };
      })
      .catch((error) => {
        throw getErrorType(error);
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

    return this.axios.post(`${this.baseUrl}`, data)
      .then(({ data: { message } }) => {
        return message;
      })
      .catch((error) => {
        throw getErrorType(error);
      });
  }

  async deleteTemplate(id) {
    return this.axios.delete(`${this.baseUrl}/${id}`)
      .then(({ data: { message } }) => {
        return message;
      })
      .catch((error) => {
        throw getErrorType(error);
      });
  }

  async editTemplate(template) {
    const data = { ...template };
    delete data._id;
    delete data.id;
    delete data.createdBy;
    delete data.active;
    delete data.insertedAt;
    delete data.creationDate;
    delete data.updatedAt;

    data.fields = data.fields.map((field) => {
      const formattedField = { ...field };
      delete formattedField.id;
      return {
        ...formattedField,
        minLimit: Number(formattedField.minLimit),
        maxLimit: Number(formattedField.maxLimit),
      };
    });

    return this.axios.put(`${this.baseUrl}/${template.id}`, data)
      .then(({ data: { message } }) => {
        return message;
      })
      .catch((error) => {
        throw getErrorType(error);
      });
  }
}

export default Template;
