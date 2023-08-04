import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static environment = ['development']
  
  public async run () {
    // Write your database queries inside the run method
    await User.create(
      {
        username: 'admin',
        password: 'admin'
      }
    )
  }
}
