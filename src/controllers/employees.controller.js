import {pool} from '../db.js'


export const getEmployees=async (req,res)=>{
  try{
    const [row]=await pool.query('SELECT *FROM employee');
    res.json(row);
   
  }catch(error){
    return res.status(500).json({message:'somenting goes wrong'})
  }
    
}

export const createEmployees= async (req,res)=>{

   try{
    const {name,salary}=req.body
    const [rows]= await pool.query('INSERT INTO employee (name,salary) VALUES (?,?)',[name,salary]);
      res.send({
       id:rows.insertId,
       name,
       salary
      })
   }catch(error){
    return res.status(500).json({message:'somenting goes wrong'})
   }

 
   

}

export const getEmployee=async(req,res)=>{

    
   try{
    const id=req.params.id;
    const [rows]=await pool.query('SELECT  *FROM employee where id=?',id);
    console.log(rows); 

    if(rows.length>0){
        res.json(rows[0]);
    }else{
        res.status(404).json({
            message:'Employee not found'
        });
    }
   }catch(error){
    return res.status(500).json({message:'somenting goes wrong'})
   }
    

  
}

export const updateEmployee=async(req,res)=>{


    try{
        const {id}=req.params;
        const {name,salary} =req.body;
        console.log(id,name,salary);
    
       const [result]=await pool.query('UPDATE employee SET name=IFNULL(?,name),salary=IFNULL(?,salary) WHERE id=?',[name,salary,id]);
       console.log(result);
    
        if(result.affectedRows<=0){
            return res.status(404).json({
            message:'Employee not found'
            })
         }
    
        const [rows]=await pool.query('SELECT *FROM employee where id=?',id);
    
        res.json(rows[0]);
    }catch(error){
     return res.status(500).json({message:'somenting goes wrong'})
    }

   
}

export const deleteEmployee=async(req,res)=>{


    
   try{
    const [result]=await pool.query('DELETE FROM employee WHERE id=?',[req.params.id]);
    console.log(result);

    if(result.affectedRows<=0){
       return res.status(404).json({
        message:'Employee not found'
       })
    }

    res.sendStatus(204);
   }catch(error){
    return res.status(500).json({message:'somenting goes wrong'})
   }
    
}