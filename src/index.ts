import config from './conf/config';
import app from './app';
import connectDatabase from './db';

const PORT = config.PORT || 3000;

connectDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })


