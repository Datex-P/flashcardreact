/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import { Context } from '../../Context'
import '../styles.css'
import Hexagons from  './Hexagons'
import RepetitionIntervalFields from './RepetitionIntervalFields'
import ColorBox from './ColorBox'

import BasicOrangeWindow from '../deck/BasicOrangeWindow'
import edit from '../../icons/edit.svg'
import save from '../../icons/save.svg'



function Settings({ history }) {
  const [editIsPossible, setEditIsPossible] = useState(false)
  const [saveOrEdit, setSaveOrEdit] = useState(false)
  const [saveOrEditGoal, setSaveOrEditGoal] = useState(false)
  const [editHex, setEditHex] = useState(true)
  
  const { dataBase, setDataBase,setShowProgressDiagram } = useContext(Context)
  const [userTimePreferences, setUserTimePreferences] = useState({})

  useEffect(() => {
    setUserTimePreferences(dataBase?.userTimePreferences || {})
  }, [dataBase?.userTimePreferences])

    useEffect(()=>{
      setShowProgressDiagram(false)
    },[])

  function setShow() {
    history.push('/')
    setShowProgressDiagram(true)
  }

  // function handleColor(e) {
  //   let newDataBase = { ...dataBase }
  //   newDataBase.userPreferences[e.target.name] = e.target.value
  //   setDataBase(newDataBase)
  // }


  function saveTimeNumberChanges() {
    let newDataBase = { ...dataBase }
    newDataBase.userTimePreferences = userTimePreferences
    setDataBase(newDataBase)
  }

  return (

    dataBase &&

    <BasicOrangeWindow
      show={true}
      setShow={setShow}
      title={

        <div
          style={{fontWeight: 'bold', fontSize: '22px'}}
          contentClassName={'pos'}
        >

          Settings
       </div>
      } 
    >
      <div className='settings__repetion-interval'
      >
          Change Repetition Interval
      </div>
      <div className='d-flex justify-content-center'
      >
          <div 
              className='d-flex border border-dark justify-content-center align-items-center'
              style={{ padding: '1px', borderRadius: '5px', position: 'relative', width: '300px', height:'88px' }}
          >
              <div 
                  className='d-flex justify-content-around align-items-center' 
                  style={{width: '280px'}}
              >
                  {
                    dataBase &&
                      
                      dataBase.userTimePreferences.map((col, k) =>

                      <RepetitionIntervalFields
                          key={k} 
                          index={k} 
                          data={col} 
                          saveOrEdit={saveOrEdit}
                          editIsPossible={editIsPossible} 
                          userTimePreferences={userTimePreferences} 
                          setUserTimePreferences={setUserTimePreferences} 
                      />
                      )
                  }
                </div>
              
          </div>
          <div 
              title='Click and change name buttons and repetition intervals for all decks.'
              style={{ position: 'absolute', right: '11px', top: '77px', cursor: 'pointer' }}
          >
              <img
                  src={saveOrEdit ? save : edit}
                  alt={saveOrEdit ? 'save' : 'edit'}
                  className= 'nonDraggableIcon'
                  style={{ outline: 'none' }}
                  onClick={() => {
                          setEditIsPossible(!editIsPossible)
                          setSaveOrEdit(!saveOrEdit)
                          saveTimeNumberChanges()
                        }}
              />
          </div>
      </div>

      <div 
          className='goalSettingsContainer'
      >
          Goal Settings
      </div>

      <div style={{ fontWeight: 'bold', fontSize: '13px', textAlign: 'center', marginBottom: '2px' }}
      >
          Current Weekly Target
      </div>

      <div 
        className='d-flex border border-dark justify-content-between align-items-center hexagonContainer'
      >
        {

          Array(7).fill('').map((el, idx) =>

            <Hexagons 
                idx={idx} 
                editHex={editHex} 
                setEditHex={setEditHex} 
                saveOrEditGoal={saveOrEditGoal} 
            />
          )
        }
      </div>
      <div style={{ position: 'absolute', top: '232px', right: '50px', cursor: 'pointer' }}
      >
        <img
          src={editHex ? edit : save}
          alt={saveOrEditGoal ? 'edit' : 'save'}
          style={{ outline: 'none' }}
          className= 'nonDraggableIcon'
          
          onClick={() => {
            setSaveOrEditGoal(!saveOrEditGoal)
            setEditHex(!editHex)
          }}
        />
      </div>
      <div className='weeklyTarget'
      >

        Target met: {dataBase.userPreferences.weeksInRow} weeks in a row

      </div>
      <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px', marginBottom: '2px' }}
      >
          Colorscheme
      </div>

      <ColorBox/>


    </BasicOrangeWindow>
  )
}

export default withRouter(Settings)













