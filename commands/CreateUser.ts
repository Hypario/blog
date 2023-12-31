import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class CreateUser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:user'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Create a new user'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest` 
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call 
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const { default: User } = await import('App/Models/User')
    const { default: Hash } = await import('@ioc:Adonis/Core/Hash')

    const username = await this.prompt.ask('Enter username')
    const password = await Hash.make(await this.prompt.secure("Choose account password"))

    await User.create({username, password})
    this.logger.action('create').succeeded(`user ${username} has been created`)
  }
}
