const time = () => new Date().toISOString();
const isDev = import.meta.env.DEV;

export const logger = {
    info: ( ...args: any[] ) => {if (isDev) console.log(time(), `[INFO]`, ...args )},
    warn: ( ...args: any[] ) => {if (isDev) console.warn(time(), `[WARN]`, ...args )},
    error: ( ...args: any[] ) => {if (isDev) console.error(time(), `[ERROR]`, ...args )},
};