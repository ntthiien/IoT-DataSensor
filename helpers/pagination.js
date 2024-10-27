module.exports=(objectPagination,query,countRecord)=>{
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }
    objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitItems;
    objectPagination.totalPage=Math.ceil(countRecord/objectPagination.limitItems);
    return objectPagination;
}