'use strict'
{
  const num_bth = document.querySelectorAll('.num_bth');
  let output_sub = document.getElementById('output_sub');//計算結果を表示する場所
  const output_total = document.getElementById('output_total');//計算過程を表示する場所
  let total = 0;
  let state = 'start';//最初の状態を定義
    //  1)計算する前の最初の状態（start）　
    //  2)数字を入力している最中（calculation）
    //  3)「＋　÷　－　×　＝」を押した直後（calBtn）
    //  4)「＝」を教えて計算が終わった直後（finish）
    //  変数stateに、star,calculation, calBtn, finishを代入して状態を管理  
  let mode = 'integer_mode'; //最初は整数入力モード、整数入力中integer_mode、小数入力中decimal_modeを定義

  // 1-9の数字ボタンを押した時
    const one_nine = document.querySelectorAll('.one_nine');
    one_nine.forEach(index => {     
      index.addEventListener('click', () => {
        if(state === 'start') {
          total = index.dataset.indexId;         
        }else if(state === 'finish') {
          reset();
          total = index.dataset.indexId;  
        }else if(state === 'calculation'||state === 'calBtn'){
          total += index.dataset.indexId;
        }     
        output_sub.textContent = total;
        state = 'calculation'
        changeOutput()
      }) //click   
    })//forEach

  // 0の数字ボタンを押した時
  const zero = document.getElementById('zero');
  zero.addEventListener('click', () => {
  if(state==='start'||state==='finish'||state==='calBtn'){
      if(output_sub.textContent.slice(-1) === '0') {
        console.log('前の文字はゼロ');
        return;
      }
    }
    
    if(state==='start') {
      total = zero.dataset.indexId;  
    }else{
      total += zero.dataset.indexId;
    }      
    output_sub.textContent = total;
    changeOutput()
  }) 

  // 小数点ボタンを押した時
  const point = document.getElementById('point');
  point.addEventListener('click', () => {
    console.log(point.dataset.indexId)
    if(mode === 'decimal_mode'){
      return;
       }      
    if(state==='start'||state==='finish') {
      total = 0;
    }else if(state==='calBtn'){
      if(output_sub.textContent.slice(-1)!=='0'){
        total += 0;
      }   
    }
    total += point.dataset.indexId;

    output_sub.textContent = total;
    state = 'calculation'
    mode = 'decimal_mode'; 
    changeOutput()
  }) //click  

  //「＋　÷　－　×」ボタンを押した時
  const cal = document.querySelectorAll('.cal');
  cal.forEach(index => {     
    index.addEventListener('click', () => {
      if(state === 'start') {
        return;
      }else if(state === 'calculation'){
        total += index.dataset.indexId;
      }else if(state === 'finish'){
        total = output_total.textContent;
        total += index.dataset.indexId;
        output_total.textContent = 0
      }else if(state ==='calBtn') {
        total = total.slice(0, -1)
        total += index.dataset.indexId;
      }

      output_sub.textContent = total;
      state = 'calBtn'
      mode ='integer_mode'
      changeOutput()
    }) //click   
  })//forEach

  //イコールを押した時
  const equal_btn = document.getElementById('equal_btn');
  equal_btn.addEventListener('click',() =>{
    console.log(eval(total));
    output_total.textContent = digitNum(eval(total));//桁数を揃える関数10桁を表示させる関数digitNum
    state = 'finish'
    mode ='integer_mode'
    changeOutput()
  });

  //Cボタンを押した時の処理
  const clear = document.getElementById('clear')
  clear.addEventListener('click', () => {
    reset();
  })

 //リセットを行う関数
  function reset() {
    total = 0; 
    output_sub.textContent = 0;
    output_total.textContent = 0;
    mode ='integer_mode'
    state ='start';
    changeOutput()
  }

  //BSを押した時の処理
  const bs = document.getElementById('bs')
  bs.addEventListener('click', () => {
    if(state ==='finish') {
      return;
    }
  
    total = output_sub.textContent.slice(0, -1);
    output_sub.textContent = total;

    let lastWord = output_sub.textContent.slice(-1)
    if(lastWord==='+'||lastWord==='-'||lastWord==='*'||lastWord==='/') {
      state = 'calBtn'
    }else if(lastWord==='') {
      state = 'start';
    }    
  });

  //桁数を揃える関数10桁を表示させる関数
  function digitNum(num) {
    return Math.round(num*100000000)/100000000;
  }

  function changeOutput(){
    if(state==='finish'){
      output_total.classList.add('active');
      output_sub.classList.remove('active');   
    }else{
      output_sub.classList.add('active');
      output_total.classList.remove('active'); 
    } 
  }

}
