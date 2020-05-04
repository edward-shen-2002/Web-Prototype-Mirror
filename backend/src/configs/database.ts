export const DATABASE_KEY: string = process.env.NODE_ENV === "production"
  ? "mongodb+srv://lime:Password123!@wp-data-g0lqo.mongodb.net/test?retryWrites=true&w=majority"
  : "mongodb://localhost:27017/mohltc-web-app-test"
