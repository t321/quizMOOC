// Definición del modelo para la tabla de comentarios.

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Comment',
        {
            texto: {
                type: DataTypes.STRING,
                validate: {notEmpty:{msg: "-> Fata Comentario"}}
            },
            publicado: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    );
}
