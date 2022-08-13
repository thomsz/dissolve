export default interface Contestant {
  id: string
  sex: string
  email: string
  birthDate: string
  profileImage: string
  name: {
    last: string
    first: string
  }
}
