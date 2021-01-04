interface IMailConfig {
    driver: 'ethereal' | 'ses';

    defaults: {
        from: {
            email: string;
            name: string;
        }
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'Kaua@gobarber.com.br',
            name: 'Kauã do GoBarber',
        },
    },
} as IMailConfig
