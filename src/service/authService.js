const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('../models/userModels');

const RefreshToken = require('../models/refreshTokenModels');

const register = async (payload) => {

    const hash = await bcrypt.hash(
        payload.password,
        10
    );

    const user = await User.create({
        name: payload.name,
        email: payload.email,
        password: hash,
    });

    return user;
};

const login = async (payload) => {

    const user = await User.findOne({
        where: {
            email: payload.email,
        },
    });

    if (!user) {
        throw new Error(
            'Email not found'
        );
    }

    const compare = await bcrypt.compare(
        payload.password,
        user.password
    );

    if (!compare) {
        throw new Error(
            'Wrong password'
        );
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
    };

    const accessToken = jwt.sign(
        jwtPayload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:
                process.env.ACCESS_TOKEN_EXPIRED,
        }
    );

    const refreshToken = jwt.sign(
        jwtPayload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:
                process.env.REFRESH_TOKEN_EXPIRED,
        }
    );

    await RefreshToken.create({
        user_id: user.id,
        token: refreshToken,
    });

    return {
        access_token: accessToken,
        refresh_token: refreshToken,
    };
};

const refresh = async (token) => {

    const tokenExist =
        await RefreshToken.findOne({
            where: {
                token,
            },
        });

    if (!tokenExist) {
        throw new Error(
            'Refresh token invalid'
        );
    }

    const decoded = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = jwt.sign(
        {
            id: decoded.id,
            email: decoded.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:
                process.env.ACCESS_TOKEN_EXPIRED,
        }
    );

    return {
        access_token: accessToken,
    };
};

const logout = async (token) => {

    await RefreshToken.destroy({
        where: {
            token,
        },
    });

    return true;
};

module.exports = {
    register,
    login,
    refresh,
    logout,
};