import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('profiles_rules', (table: TableBuilder) => {
		table.integer('profile_id').unsigned().references('id').inTable('profiles').notNullable().primary();
		table.integer('rule_id').unsigned().references('id').inTable('rules').notNullable().primary();
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('profiles_rules');
}
