<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>

export default {
    props:{
        cellData : String,
        rowIndex : Number,
        cellIndex : Number,
    },
    methods:{
        onClickTd(){
            //상대방이 눌렀을 경우  
            // if(this.cellData)return false; 

            const rootData = this.$root.$data;
            // console.log(rootData)
            // console.log(this.$parent.$data)
            //현재 o의 턴이면 o를 넣고 x의 턴이면 x를 넣음
            this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn); 

            let win = false;
            if(rootData.tableData[this.rowIndex][0] === rootData.turn &&
                rootData.tableData[this.rowIndex][1] === rootData.turn &&
                rootData.tableData[this.rowIndex][2] === rootData.turn){
                win= true;
            }
            if(rootData.tableData[0][this.cellIndex] === rootData.turn &&
                rootData.tableData[1][this.cellIndex] === rootData.turn &&
                rootData.tableData[2][this.cellIndex] === rootData.turn){
                win= true;
            }
            if(rootData.tableData[0][0] === rootData.turn &&
                rootData.tableData[1][1] === rootData.turn &&
                rootData.tableData[2][2] === rootData.turn){
                win= true;
            }
            if(rootData.tableData[0][2] === rootData.turn &&
                rootData.tableData[1][1] === rootData.turn &&
                rootData.tableData[2][0] === rootData.turn){
                win= true;
            }

            if(win){ //승리. 3줄달성
                rootData.winner = rootData.turn;
                rootData.turn = 'o';
                rootData.tableData = [[' ',' ',' '], [' ',' ',' '],[' ',' ',' ']]
            }else{ // 무승부   
                // let flag = true ;
                // rootData.tableData.forEach((row)=>{
                //     row.forEach((cell)=>{
                //         if(!cell){
                //             flag=false;
                //         }
                //     })
                // })

                // if(flag){ //무승부일때 초기화
                //     rootData.winner='ㅋㅋㅋㅋ',
                //     rootData.turn ='o';
                //     rootData.tableData = [[' ',' ',' '], [' ',' ',' '],[' ',' ',' ']];
                // }else{
                //     rootData.turn = rootData.turn === 'o' ? 'x' : 'o';
                // }
                rootData.turn = rootData.turn === 'o' ? 'x' : 'o';
            }
        },
    }
}
</script>

<style>

</style>