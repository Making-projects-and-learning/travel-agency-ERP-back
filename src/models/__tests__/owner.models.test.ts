import { describe, test, beforeAll, afterAll, expect } from '@jest/globals'
import OwnerModel from '../owner.models'
import AdminModel from '../admin.models'
import DriverModel from '../driver.models'
import { dbConnect, dbDisconnect } from '../../config'

describe('Owner', () => {
  const ownerData = {
    email: 'owner@owner.com',
    password: 'itpasswoodsecretiguess',
  }
  beforeAll(async () => await dbConnect(), 20000)
  afterAll(async () => {
    await OwnerModel.deleteMany({})
    await AdminModel.deleteMany({})
    await DriverModel.deleteMany({})
    await dbDisconnect()
  }, 20000)

  test('create owner', async () => {
    const owner = new OwnerModel(ownerData)
    const createdOwner = async () => await owner.save()
    await expect(createdOwner()).resolves.not.toThrow()
  }, 20000)

  test('duplicate owner', async () => {
    const owner = new OwnerModel(ownerData)
    const createdOwner = async () => await owner.save()
    await expect(createdOwner()).rejects.toThrow()
  }, 20000)
  test('create Owner with admins and drivers', async () => {
    const driversData = [
      {
        name: 'Moro',
        location: 'lat:51.507351,long:-0.127758',
        phone_number: '+21256988554',
        address: 'jhon fenson 1523st another land',
      },
      {
        name: 'Maro',
        location: 'lat:51.507351,long:-0.127758',
        phone_number: '+23356845221',
        address: 'jhon fensonkinon 1523st another land',
      },
    ]
    const adminsData = [
      {
        username: 'someusername',
        email: 'blabla@sparrow.com',
        password: 'shhhhtitspasswordwink',
      },
      {
        username: 'uadmin',
        email: 'enough@nota.com',
        password: 'shhhhtitspasswordwink',
      },
    ]
    const ownerData = {
      email: 'owner@creator.com',
      password: 'itpasswoodtheycallitsecret',
    }

    const admins = await AdminModel.create(adminsData)
    const drivers = await DriverModel.create(driversData)
    const owner = new OwnerModel(ownerData)
    owner.admins = admins
    owner.drivers = drivers
    const createOwner = async () => await owner.save()
    await expect(createOwner()).resolves.not.toThrow()
  }, 30000)
})
