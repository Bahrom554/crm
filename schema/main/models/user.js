module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        midName: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        role_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: { tableName: 'roles' },
                key: 'id'
            }
        },
        creator_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: {
                    tableName: 'users'
                },
                key: 'id'
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        tableName: 'users',
        schema: 'public',
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['password'] } // exclude 'password' by default
          }

    });
};
