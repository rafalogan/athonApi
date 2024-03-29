import { ServicesModule } from 'src/services';
import { LoginController } from 'src/api/controllers/login.controller';
import { UserController } from 'src/api/controllers/user.controller';
import { RuleController } from 'src/api/controllers/rule.controller';
import { ProfileController } from 'src/api/controllers/profile.controller';
import { ProfileRuleController } from 'src/api/controllers/profile-rule.controller';
import { UserRuleController } from 'src/api/controllers/user-rule.controller';
import { ContactController } from 'src/api/controllers/contact.controller';
import { AnswerController } from 'src/api/controllers/answer.controller';
import { SocialMediaController } from 'src/api/controllers/social-media.controller';
import { CategoryController } from 'src/api/controllers/category.controller';
import { FileController } from 'src/api/controllers/file.controller';
import { ArticleController } from 'src/api/controllers/article.controller';
import { NewsletterController } from 'src/api/controllers/newsletter.controller';

export class ControllersModule {
	loginController: LoginController;
	userController: UserController;
	userRuleController: UserRuleController;
	ruleController: RuleController;
	profileController: ProfileController;
	profileRuleController: ProfileRuleController;
	contactController: ContactController;
	answerController: AnswerController;
	socialMediaController: SocialMediaController;
	categoryController: CategoryController;
	fileController: FileController;
	articleController: ArticleController;
	newsletterController: NewsletterController;

	constructor(private servers: ServicesModule) {
		this.loginController = new LoginController(this.servers.loginService);
		this.userController = new UserController(this.servers.userService);
		this.userRuleController = new UserRuleController(this.servers.userRuleService);
		this.ruleController = new RuleController(this.servers.ruleService);
		this.profileController = new ProfileController(this.servers.profileService);
		this.profileRuleController = new ProfileRuleController(this.servers.profileRuleService);
		this.contactController = new ContactController(this.servers.contactService);
		this.answerController = new AnswerController(this.servers.answerService);
		this.socialMediaController = new SocialMediaController(this.servers.socialMediaService);
		this.categoryController = new CategoryController(this.servers.categoryService);
		this.fileController = new FileController(this.servers.fileService);
		this.articleController = new ArticleController(this.servers.articleService);
		this.newsletterController = new NewsletterController(this.servers.newsletterService);
	}
}
