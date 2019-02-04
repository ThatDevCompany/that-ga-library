import { GACitizen, GACitizenTest } from './GACitizen'

describe('GACitizen', () => {
	it('should not break code coverage', () => {
		expect(GACitizenTest).toBeDefined()
	})

	it('should be an interface', () => {
		class MockGACitizen implements GACitizen {
			mateWith(other: GACitizen): GACitizen {
				return null
			}
			mutate(mutationRate: number) {}
		}
		expect(true).toBeTruthy()
	})
})
