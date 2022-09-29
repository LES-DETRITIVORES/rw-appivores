import {
  usagers,
  usager,
  createUsager,
  updateUsager,
  deleteUsager,
} from './usagers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('usagers', () => {
  scenario('returns all usagers', async (scenario) => {
    const result = await usagers()

    expect(result.length).toEqual(Object.keys(scenario.usager).length)
  })

  scenario('returns a single usager', async (scenario) => {
    const result = await usager({ id: scenario.usager.one.id })

    expect(result).toEqual(scenario.usager.one)
  })

  scenario('creates a usager', async () => {
    const result = await createUsager({
      input: {
        nom: 'String',
        tiers: 'String',
        contact: 'String',
        adresse: 'String',
        adresse2: 'String',
        codePostal: 'String',
        ville: 'String',
        email: 'String',
        telephone1: 'String',
        telephone2: 'String',
        note: 'String',
        actif: true,
      },
    })

    expect(result.nom).toEqual('String')
    expect(result.tiers).toEqual('String')
    expect(result.contact).toEqual('String')
    expect(result.adresse).toEqual('String')
    expect(result.adresse2).toEqual('String')
    expect(result.codePostal).toEqual('String')
    expect(result.ville).toEqual('String')
    expect(result.email).toEqual('String')
    expect(result.telephone1).toEqual('String')
    expect(result.telephone2).toEqual('String')
    expect(result.note).toEqual('String')
    expect(result.actif).toEqual(true)
  })

  scenario('updates a usager', async (scenario) => {
    const original = await usager({ id: scenario.usager.one.id })
    const result = await updateUsager({
      id: original.id,
      input: { nom: 'String2' },
    })

    expect(result.nom).toEqual('String2')
  })

  scenario('deletes a usager', async (scenario) => {
    const original = await deleteUsager({
      id: scenario.usager.one.id,
    })

    const result = await usager({ id: original.id })

    expect(result).toEqual(null)
  })
})