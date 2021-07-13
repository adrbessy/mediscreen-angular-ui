export class Patient {
  constructor(
    public id: number,
    public given: string,
    public family: string,
    public dob: string,
    public sex: string,
    public address: string,
    public phone: string
  ) {}
}
