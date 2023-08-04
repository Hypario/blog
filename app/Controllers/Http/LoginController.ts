import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator';

export default class LoginController {

    public async index({view}: HttpContextContract) {
        return view.render('login');
    }

    public async login({request, auth, response, session}: HttpContextContract) {
        const {username, password} = await request.validate(LoginValidator)

        try {
            await auth.attempt(username, password);
            response.redirect('/')
        } catch (error) {
            session.flash('auth', "Wrong username or password.")
            response.redirect().back() // failed to login
        }
    }

}
