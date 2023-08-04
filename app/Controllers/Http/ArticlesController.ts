import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'

export default class ArticlesController {
  public async index({request, view}: HttpContextContract) {
    const page = request.input('page', 1)
    const articles = await Article.query().orderBy('created_at', 'desc').paginate(page, 3)

    articles.baseUrl('/articles')

    return view.render('articles/index', {
      articles
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({request, view}: HttpContextContract) {
    const id = request.param('id')

    const article = await Article.findOrFail(id)
    await article.load('owner')

    return view.render('articles/show', {
      article
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
