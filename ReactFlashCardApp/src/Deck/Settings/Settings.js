/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import { Context } from '../../Context'
import '../../styles.css'
import Hexagons from  './Hexagons'
import RepetitionIntervalFields from './RepetitionIntervalFields'
import ColorScheme from './ColorScheme'

import BasicOrangeWindow from '../deck/BasicOrangeWindow/BasicOrangeWindow'
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
              className='border border-dark justify-center-align-center settings_repetition-container'
          >
              <div 
                  className='justify-aroundCenter' 
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
              className='settings__save-or-edit-container'
              title='Click and change name buttons and repetition intervals for all decks.'
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
          className='settings__goal-settings'
      >
          Goal Settings
      </div>

      <div className='settings__weekly-target'
      >
          Current Weekly Target
      </div>

      <div 
        className='justify-between-align-center border border-dark  settings__container-hexagon'
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
      <div className='settings__weekly-target justify-center'
      >

        Target met: {dataBase.userPreferences.weeksInRow} weeks in a row

      </div>
     

      <ColorScheme/>


    </BasicOrangeWindow>
  )
}

export default withRouter(Settings)













