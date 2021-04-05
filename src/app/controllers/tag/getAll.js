import Tag from '../../models/Tag';

export default async (req, res) => {
  const { user_id } = req;

  try {
    const tags = await Tag.findAll({
      where: {
        user_id,
      },
    });

    return res.json(tags);
  } catch (error) {
    throw new Error('Failed with an error in database request.');
  }
};
