import React, { useEffect, useState } from 'react'



// export default  Example extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     };
//     console.log(1,'constractor stage')
//   }

//   componentDidMount() {
//     console.log(3,`You clicked ${this.state.count} times`, 'mount stage');
//   }
//   componentDidUpdate() {
//     console.log(4,`You clicked ${this.state.count} times`, 'update stage');
//   }

//   render() {
//     console.log(2,'render stage')
//     return (
//       <div>
//         <p>You clicked {this.state.count} times</p>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//           Click me
//         </button>
//       </div>
//     );
//   }
// }

/*export default function Example () {

const [counter, setCounter] = useState(0); //equal to constractor stage

useEffect(()=>{
  console.log(3,`You clicked ${counter} times`, 'mount stage');
},[])

useEffect(()=> {
  console.log(4,`You clicked ${counter} times`, 'update stage');
}, [counter])

console.log(2,'render stage')

  
  return (
    <div>
      <p>You clicked {counter} times</p>
      <button onClick={() => setCounter(counter + 1 )  }>
        Click me
      </button>
    </div>
  );

}*/


export default function Example () {

  const [arr, setArr] = useState([]); //equal to constractor stage
  //console.log('after constructor')
  useEffect(()=>{
    setTimeout(()=>{setArr([1,2,3])},3000)
    console.log('after mounting')
  },[])
  
  console.log('before render')
    
    return (
      <ul>
        {
          arr.map(num=> <li>{num}</li>)
        }
        
      </ul>
    );
  
  }
  
  
  



