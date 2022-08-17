import App from '@/app';
import AuthRoute from '@routes/auth.route';
import Groups from '@routes/groups.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new Groups(), new UsersRoute(), new AuthRoute()]);

app.listen();
