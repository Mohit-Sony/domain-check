const queue = require('../config/kue');

const user_mailer = require('../mailer/user_mailer');

queue.process('emails',function(job , done){
    console.log('emails worker is processing a job' , job.data);

    user_mailer.forgot_password(job.data);
    done();
});