import app from './app';

const port: number = parseInt(process.env.PORT!) || 3000;
console.log(`Using port: ${port}`);

const server = app.listen(port, () => console.log(`server is running on port ${port}`));

// Handle uncaught errors, unhandled rejections, and SIGTERM/SIGINT
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error Shutting Down...');
    console.error(err.name, err.message, err.stack);
        process.exit(1);
});
   
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });
});

process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });
});

