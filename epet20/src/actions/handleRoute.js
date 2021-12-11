


export const handleRoute = (navigate, role) => {
    switch (role) {
        case 'administrador':
            navigate('/admin');
            break;
        case 'secretaria':
            navigate('/admin');
            break;
        case 'preceptoria':
            navigate('/admin');
            break;
        case 'direccion':
            navigate('/admin');
            break;
        case 'usuario':
            navigate('/inicio');
            break;

        default: navigate('/inicio');
            break;

    }
}
