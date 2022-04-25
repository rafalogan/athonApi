import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { SocialMediaController } from 'src/api/controllers/social-media.controller';
import { IAuthConfig } from 'src/repositories/types';

export class SocialMediaRoutes extends AbstractRoutes {
	constructor(private socialMediaController: SocialMediaController, app: Application, auth: IAuthConfig) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/social-medias')
			.all(this.auth?.authenticate())
			.get(this.socialMediaController.list.bind(this.socialMediaController))
			.post(this.socialMediaController.save.bind(this.socialMediaController));

		this.app
			.route('/social-medias/:id')
			.all(this.auth?.authenticate())
			.get(this.socialMediaController.list.bind(this.socialMediaController))
			.put(this.socialMediaController.edit.bind(this.socialMediaController))
			.delete(this.socialMediaController.remove.bind(this.socialMediaController));
	}
}
