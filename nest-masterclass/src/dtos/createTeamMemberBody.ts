import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateTeamMemberBody {
	@IsNotEmpty({
		message: 'Name is required',
	})
	@IsString()
	@Length(3, 255, {
		message: 'Name must be between 3 and 255 characters',
	})
	name: string

	@IsNotEmpty({
		message: 'Function is required',
	})
	@IsString()
	@Length(3, 255, {
		message: 'Function must be between 3 and 255 characters',
	})
	function: string
}
