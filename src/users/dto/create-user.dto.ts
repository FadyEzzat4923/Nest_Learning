import { IsString, IsEmail, IsNotEmpty, IsStrongPassword, IsUUID, IsEnum, IsOptional } from 'class-validator';

enum UserRole {
    INTIER = 'intier',
    ENGINEER = 'engineer',
    ADMIN = 'admin',
}

export class CreateUserDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsString()
    @IsNotEmpty()
    fullName!: string;

    @IsEmail()
    email!: string;

    @IsStrongPassword()
    password!: string;

    @IsEnum(UserRole, {
        message: 'role must be intern, engineer, or admin',
    })
    role!: UserRole
}