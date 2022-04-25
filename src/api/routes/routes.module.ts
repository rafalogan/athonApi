import { Application } from 'express';

import { IAuthConfig } from 'src/repositories/types';
import { ControllersModule } from 'src/api/controllers';
import { UserRoutes } from 'src/api/routes/user.routes';
import { LoginRoutes } from 'src/api/routes/login.routes';
import { RuleRoutes } from 'src/api/routes/rule.routes';
import { ProfileRoutes } from 'src/api/routes/profile.routes';
import { ContactRoutes } from 'src/api/routes/contact.routes';
import { AnswerRoutes } from 'src/api/routes/answer.routes';
import { SocialMediaRoutes } from 'src/api/routes/social-media.routes';
import { CategoryRoutes } from 'src/api/routes/category.routes';
import { FileRoutes } from 'src/api/routes/file.routes';
import { ArticleRoutes } from 'src/api/routes/article.routes';

export class RoutesModule {
	userRoutes: UserRoutes;
	loginRoutes: LoginRoutes;
	ruleRoutes: RuleRoutes;
	profileRoutes: ProfileRoutes;
	contactRoutes: ContactRoutes;
	answerRoutes: AnswerRoutes;
	socialMediaRoutes: SocialMediaRoutes;
	categoryRoutes: CategoryRoutes;
	fileRutes: FileRoutes;
	articleRoutes: ArticleRoutes;

	constructor(private controllers: ControllersModule, private app: Application, private auth: IAuthConfig) {
		this.loginRoutes = new LoginRoutes(this.controllers.loginController, this.app);
		this.userRoutes = new UserRoutes(this.controllers.userController, this.controllers.userRuleController, this.app, this.auth);
		this.ruleRoutes = new RuleRoutes(this.controllers.ruleController, this.app, this.auth);
		this.profileRoutes = new ProfileRoutes(this.controllers.profileController, this.controllers.profileRuleController, this.app, this.auth);
		this.contactRoutes = new ContactRoutes(this.controllers.contactController, this.app, this.auth);
		this.answerRoutes = new AnswerRoutes(this.controllers.answerController, this.app, this.auth);
		this.socialMediaRoutes = new SocialMediaRoutes(this.controllers.socialMediaController, this.app, this.auth);
		this.categoryRoutes = new CategoryRoutes(this.controllers.categoryController, this.app, this.auth);
		this.fileRutes = new FileRoutes(this.controllers.fileController, this.app, this.auth);
		this.articleRoutes = new ArticleRoutes(this.controllers.articleController, this.app, this.auth);
	}

	exec() {
		this.loginRoutes.exec();
		this.userRoutes.exec();
		this.ruleRoutes.exec();
		this.profileRoutes.exec();
		this.contactRoutes.exec();
		this.answerRoutes.exec();
		this.socialMediaRoutes.exec();
		this.socialMediaRoutes.exec();
		this.fileRutes.exec();
		this.articleRoutes.exec();
	}
}
