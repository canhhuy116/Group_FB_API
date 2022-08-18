import App from '@/app';
import AuthRoute from '@routes/auth.route';
import GroupsRoute from '@routes/groups.route';
import UsersRoute from '@routes/users.route';
import PostsRoute from '@routes/posts.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new GroupsRoute(), new UsersRoute(), new AuthRoute(), new PostsRoute()]);

app.listen();
