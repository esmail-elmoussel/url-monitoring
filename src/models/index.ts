import { UserModel } from './user.model';
import { UrlModel } from './url.model';
import { PollRequestModel } from './poll-request.model';

UserModel.hasMany(UrlModel, { as: 'user' });
UrlModel.belongsTo(UserModel, { as: 'user' });

export { UserModel, UrlModel, PollRequestModel };
