import { UserModel } from './user.model';
import { UrlModel } from './url.model';
import { PollRequestModel } from './poll-request.model';

UrlModel.belongsTo(UserModel, { as: 'user' });

UrlModel.hasMany(PollRequestModel, {
  as: 'pollRequests',
  foreignKey: 'url_id',
});

export { UserModel, UrlModel, PollRequestModel };
