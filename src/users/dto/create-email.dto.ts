export class CreateEmailDto {
  to: string;
  subject: string;
  template: string;
  dataTemplate: { text: string };
}
