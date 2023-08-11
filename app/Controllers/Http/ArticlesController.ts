import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import ArticleValidator from 'App/Validators/ArticleValidator'

export default class ArticlesController {
  public async index({request, view}: HttpContextContract) {
    const page = request.input('page', 1)
    const articles = await Article.query().orderBy('created_at', 'desc').paginate(page, 3)

    articles.baseUrl('/articles')

    return view.render('articles/index', {
      articles
    })
  }

  public async create({view}: HttpContextContract) {
    return view.render('articles/create')
  }

  public async store({auth, request, response}: HttpContextContract) {
    const { user } = auth
    const { title, content } = await request.validate(ArticleValidator)

    const article = await Article.create({
      title, content, ownerId: user!.id
    })
    
    return response.redirect().toRoute('articles.show', [article.id])
  }

  public async show({request, view}: HttpContextContract) {
    const id = request.param('id')

    const article = await Article.findOrFail(id)
    await article.load('owner')

    return view.render('articles/show', {
      article
    })
  }

  public async edit({view, params, auth}: HttpContextContract) {
    const { id } = params

    // exception is handled by the framework
    const article = await Article.findOrFail(id)

    console.log(article);
    console.log(auth.isAuthenticated);

    return view.render('articles/edit', { article })
  }

  public async update({params, request, response}: HttpContextContract) {
    const { id } = params

    // exception is handled by the framework
    const article = await Article.findOrFail(id)

    const { title, content } = await request.validate(ArticleValidator)

    article.title = title
    article.content = content

    await article.save()

    return response.redirect().toRoute('articles.show', [article.id])
  }

  public async destroy({}: HttpContextContract) {}
}
