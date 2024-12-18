export const JwtConstans = {
  access: {
    secret: process.env.ACCESS_SECRET || 'qwertyuikmdf',
    exporesTime: process.env.ACCESS_EXPIRES || '1h',
  },
  refresh: {
    secret: process.env.REFRESH_SECRET || 'qwertyuikmdf',
    exporesTime: process.env.REFRESH_EXPIRES || '1h',
  },
};
