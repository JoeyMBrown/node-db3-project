const db = require('../../data/db-config');

function find() { // EXERCISE A

    return db('schemes as sc')
      .leftJoin('steps as st', 'sc.scheme_id', '=', 'st.scheme_id')
      .select('sc.*', 'st.step_id')
      .count('st.step_id as number_of_steps')
      .groupBy('sc.scheme_id')
      .orderBy('sc.scheme_id', 'asc')
}

async function findById(scheme_id) { // EXERCISE B

      const schemeSteps = await db('schemes as sc')
        .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
        .select('sc.scheme_name', 'st.*')
        .where('sc.scheme_id', scheme_id)
        .orderBy('st.step_number', 'asc')

        // if(!schemeSteps[0]) {
        //   return null;
        // }

        const scheme = {
          scheme_id: schemeSteps[0].scheme_id,
          scheme_name: schemeSteps[0].scheme_name
        }

        if(schemeSteps[0].step_id !== null) {

            scheme.steps = schemeSteps.map((step) => { // -------> [ {scheme_id: 1, scheme_name: World Domination, steps:[{step_id: 2, step_number: 1, instructions: solve prime number theory}, {step_id: 1, step_number: 2, instructions: crack cyber security}]
              return { step_id: step.step_id, 
                       step_number: step.step_number, 
                       instructions: step.instructions
                      }})
          } else {

          scheme.steps = [];
        }

        return scheme;
}

 function findSteps(scheme_id) { // EXERCISE C

  return db('schemes as sc')
  .innerJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
  .select('sc.scheme_name', 'st.step_id', 'st.step_number', 'st.instructions')
  .where('sc.scheme_id', scheme_id)
  .orderBy('st.step_number', 'asc')

//   SELECT 
//   sc.scheme_name,
//   st.step_id,
//   st.step_number,
//   st.instructions
// FROM schemes as sc
// LEFT JOIN steps as st
//   on sc.scheme_id = st.scheme_id
// WHERE sc.scheme_id = 1
// ORDER BY step_number ASC;
}

function add(scheme) { // EXERCISE D
 return db('schemes').insert(scheme)
 .then((scheme_id) => {
   return db('schemes').where('scheme_id', scheme_id).first();
 })
}

function addStep(scheme_id, step) { // EXERCISE E
    step.scheme_id = scheme_id;

    return db('steps').insert(step)
    .then((something) => {
      return db('steps').where('scheme_id', scheme_id).orderBy('step_number', 'asc')
    })
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
