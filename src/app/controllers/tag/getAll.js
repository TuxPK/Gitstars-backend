import Tag from '../../models/Tag';

export default async (req, res) => {
  const { user_id } = req;

  try {
    const tags = await getAll(user_id);

    return res.json(tags);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

async function getAll(user_id) {
  try {
    return await Tag.findAll({
      where: {
        user_id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}
