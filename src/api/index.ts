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
export const fetchData3 = () => {
    return request({
        url: './table3.json',
        method: 'get'
    });
};

export const fetchData4 = () => {
    return request({
        url: './table4.json',
        method: 'get'
    });
};

export const fetchData5 = () => {
    return request({
        url: './table5.json',
        method: 'get'
    });
};
