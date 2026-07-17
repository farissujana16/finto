const authService =
    require('../service/authService');

module.exports = {

    register: async (req, res) => {
        try {

            const data =
                await authService.register(
                    req.body
                );

            res.status(201).json({
                data,
            });

        } catch (e) {

            res.status(500).json({
                message: e.message,
            });

        }
    },

    login: async (req, res) => {
        try {

            const data =
                await authService.login(
                    req.body
                );

            res.json(data);

        } catch (e) {

            res.status(500).json({
                message: e.message,
            });

        }
    },

    refresh: async (req, res) => {
        try {

            const data =
                await authService.refresh(
                    req.body.refresh_token
                );

            res.json(data);

        } catch (e) {

            res.status(401).json({
                message: e.message,
            });

        }
    },

    logout: async (req, res) => {
        try {

            await authService.logout(
                req.body.refresh_token
            );

            res.json({
                message:
                    'Logout success',
            });

        } catch (e) {

            res.status(500).json({
                message: e.message,
            });

        }
    },

};