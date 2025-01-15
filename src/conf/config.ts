interface IConfig {
    PORT: number;
}

const config = {
    PORT : process.env.PORT
}

export default config;