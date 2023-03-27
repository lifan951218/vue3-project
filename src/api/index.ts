import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: './table.json',
        method: 'get'
    });
};

export const fetchData2 = () => {
    return request({
        url: './table2.json',
        method: 'get'
    });
};
