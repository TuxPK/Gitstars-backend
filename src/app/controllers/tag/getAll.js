import Tag from '../../models/Tag';

export default async (req, res) => {
  const { user_id } = req;

  try {
    const tags = await getAll(user_id);

    return res.json(tags);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

async function getAll(user_id) {
  try {
    const tags = await Tag.findAll({
      where: {
        user_id,
      },
    });

    return tags;
  } catch (error) {
    throw new Error(error);
  }
}
