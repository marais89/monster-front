export class Project {

  id: number;
  code: string;
  name: string;
  description: string;
  businessId: number;
  color: string;

  constructor(id: number, code: string, name: string, description: string, businessId: number, color: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.businessId = businessId;
    this.color = color;
  }
}
